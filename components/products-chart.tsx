interface chartData {
    week: string;
    product: number;
}


export default function ProductsChart({ data }: { data: chartData[] }) {
    return <div data-points={data.length}></div>;
}
