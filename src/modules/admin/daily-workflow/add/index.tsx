"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AddDailyReportSchema } from "../validation";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import FormSelect from "@/components/common/form/select";
import { IReport, Sector } from "@/types/daily-workflow";
import FormDate from "@/components/common/form/date";
import FormInput from "@/components/common/form/input";
import { Karat } from "@/types/invoice";
import FormTextArea from "@/components/common/form/textarea";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/common/discard-dialog";
import ReportTable from "../components/report-table";
import { toast } from "sonner";
import { addDailyWorkflow } from "@/network/external/daily-workflow";

export interface AddDailyWorkflowModuleProps {}

const AddDailyWorkflowModule: FC<AddDailyWorkflowModuleProps> = () => {
  const [reports, setReports] = useState<IReport[]>([]);

  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(AddDailyReportSchema),
  });
  const { handleSubmit, watch } = form;

  type DailtReportData = z.infer<typeof AddDailyReportSchema>;

  const onSubmit = async (data: DailtReportData) => {
    const { date, ...report } = data;
    setReports((prev) => [...prev, report]);
  };

  const handleSave = async () => {
    try {
      await addDailyWorkflow({
        reports,
        date: watch("date"),
      }).then(() => {
        toast.success("Report added successfully!");
        // handleDiscardInvoice()
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  const handleDiscardInvoice = () => {
    setReports([]);
    form.reset({
      karat: Karat.K18,
    });
  };
  const handleEditReport = (report: IReport, index: number) => {
    setReports((prevReport) => prevReport.filter((_, i) => i !== index));
    form.reset({ date: watch("date"), ...report });
  };
  const handleDeleteReport = (index: number) => {
    setReports((prevReport) => prevReport.filter((_, i) => i !== index));
  };
  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Card className="p-5">
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="flex lg:w-1/3">
              <FormSelect
                control={form.control}
                name="from"
                label="From"
                placeholder="Select Type"
                options={Object.values(Sector).map((type) => ({
                  label: type,
                  value: type,
                }))}
              />
            </div>
            <div className="flex lg:w-1/3">
              <FormSelect
                control={form.control}
                name="to"
                label="To"
                placeholder="Select Type"
                options={Object.values(Sector).map((type) => ({
                  label: type,
                  value: type,
                }))}
              />
            </div>
            <div className="flex lg:w-1/3">
              <FormDate
                control={form.control}
                name="date"
                label="Date"
                defaultValue={new Date()}
                placeholder="Pick a date"
              />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="flex lg:w-1/3">
              <FormInput
                control={form.control}
                name="weight"
                label="Weight"
                placeholder="Enter weight"
              />
            </div>
            <div className="flex lg:w-1/3">
              <FormInput
                control={form.control}
                name="quantity"
                label="Quantity"
                placeholder="Enter quantity"
              />
            </div>
            <div className="flex lg:w-1/3">
              <FormSelect
                control={form.control}
                name="karat"
                label="Karat"
                defaultValue={watch("karat")}
                placeholder="Select Type"
                options={Object.values(Karat).map((karat) => ({
                  label: karat,
                  value: karat,
                }))}
              />
            </div>
          </div>
          <FormTextArea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Enter description"
          />
          <div className="flex justify-between flex-col lg:flex-row">
            <div className="mb-3 lg:mb-0">
              <Button variant={"secondary"} type="submit">
                Add
              </Button>
            </div>
            <div className="flex gap-3">
              <ConfirmDialog
                onConfirm={handleDiscardInvoice}
                text="Discard Report"
                title="Discard Report"
                description="Are you sure you want to discard Report?"
              >
                <Button type="button" variant={"destructive"}>
                  Discard Report
                </Button>
              </ConfirmDialog>
              <Button type="button" onClick={handleSave}>
                Save Report
              </Button>
            </div>
          </div>
        </Card>
        <ReportTable
          reports={reports}
          onDelete={handleDeleteReport}
          onEdit={handleEditReport}
        />
      </form>
  );
};

export default AddDailyWorkflowModule;
