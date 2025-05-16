"use client"

import * as React from "react"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type Option = {
  _id: string
  name: string
}

interface MultiSelectProps {
  options: any[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  emptyMessage?: string
  className?: string
  badgeClassName?: string
}

export function MultiSelect({
  options,
  selected=[],
  onChange,
  placeholder = "Select options...",
  emptyMessage = "No options found.",
  className,
  badgeClassName,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  
  const handleUnselect = (value: string) => {
    onChange(selected.filter((item) => item !== value))
  }

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex min-h-10 w-full flex-wrap items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            className,
          )}
        >
          <div className="flex flex-wrap gap-1">
            {selected?.length > 0 ? (
              selected.map((value) => {
                const option = options.find((option) => option._id === value)
                return (
                  <Badge
                    key={value}
                    variant="secondary"
                    className={cn(
                      "flex items-center gap-1 px-2 py-1 data-[selected]:bg-primary data-[selected]:text-primary-foreground",
                      badgeClassName,
                    )}
                  >
                    {option?.name}
                    <button
                      type="button"
                      className="rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleUnselect(value)
                      }}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {option?.name}</span>
                    </button>
                  </Badge>
                )
              })
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <div className={cn(selected.length > 0 ? "opacity-100" : "opacity-0", "transition-opacity")}>
            <X
              className="h-4 w-4 shrink-0 cursor-pointer opacity-50 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
                onChange([])
              }}
            />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search options..." />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => {
                const isSelected = selected.includes(option._id)
                return (
                  <CommandItem
                    key={option._id}
                    value={option._id}
                    onSelect={() => handleSelect(option._id)}
                    className={cn("flex items-center gap-2", isSelected && "bg-primary/10 font-medium text-primary")}
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>{option.name}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

