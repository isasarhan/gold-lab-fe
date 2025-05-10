'use client';
import type { FC } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationCompProps {
    total: number;
    page: number;
    pages: number;
}

const PaginationComp: FC<PaginationCompProps> = ({ page = 1, pages, total }) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const goToPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams?.toString());
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const generatePageNumbers = () => {
        const visiblePages = [];

        if (pages <= 5) {
            for (let i = 1; i <= pages; i++) {
                visiblePages.push(i);
            }
        } else {
            visiblePages.push(1);
            if (page > 3) visiblePages.push(-1); // -1 will be ellipsis

            const start = Math.max(2, page - 1);
            const end = Math.min(pages - 1, page + 1);

            for (let i = start; i <= end; i++) {
                visiblePages.push(i);
            }

            if (page < pages - 2) visiblePages.push(-1);
            visiblePages.push(pages);
        }

        return visiblePages;
    };

    const pagesArray = generatePageNumbers();

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) goToPage(--page);
                        }}
                    />
                </PaginationItem>

                {pagesArray.map((p, index) =>
                    p === -1 ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={p}>
                            <PaginationLink
                                href="#"
                                isActive={p === page}
                                onClick={(e) => {
                                    e.preventDefault();
                                    goToPage(p);
                                }}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (page < pages) goToPage(++page);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComp;
