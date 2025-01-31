"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { ChartNoAxesCombined, TrendingUp } from "lucide-react";
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchStatistics } from "../../actions/statisticsActions"; // Import the fetchStatistics function

export default function Page() {

const [chartData, setChartData] = useState<
{ month: string; arrivees: number; departs: number }[]
  >([]);
  const [totalLetters, setTotalLetters] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = "fakeUserId"; // Replace with a real userId if available
        const data = await fetchStatistics(userId);

        // Handle error message if exists
        if ("error" in data) {
          setError(data.error); // Set error message
          return;
        }

        // Format monthly data
        const formattedData = data.monthlyStats.map((item) => ({
          month: item.month,
          arrivees: item.arrivees,
          departs: item.departs,
        }));

        setChartData(formattedData);
        setTotalLetters(data.lettresArrivees + data.lettresDeparts);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setError("An unexpected error occurred while fetching statistics.");
      }
    };
    fetchData();
  }, []);

  const chartConfig = {
    arrivee: {
      label: "Courriers Arrivées",
      color: "#48A6A7", // Green color for arrivals
    },
    depart: {
      label: "Courriers Départ",
      color: "#2973B2", // Red color for departures
    },
  };

  const totalArrivees = chartData.reduce((acc, curr) => acc + curr.arrivees, 0);
  const totalDeparts = chartData.reduce((acc, curr) => acc + curr.departs, 0);

  return (
    <>
      {!loaded ? (
        <div className="flex items-center justify-center min-h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
      <>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumb>
                    <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                            Bureau d'ordre
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Statistiques</BreadcrumbPage>
                    </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
        <div className="container flex gap-4 flex-col">
            {" "}
            <h1
                className=" rounded-lg w-fit self-center bg-gradient-to-r from-gray-200 
        from-40% to-blue-500 text-gray-900 text-2xl 
        font-semibold p-3 flex items-center justify-center"
            >
                <span>Statistiques des courriers</span>
            </h1>
            <div className="flex flex-row  gap-6">
                {/* Handle errors */}
                {error && <div className="text-red-500">{error}</div>}

                {/* Bar Chart with Monthly Stats */}
                <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Statistiques Mensuelles des courriers</CardTitle>
                    <CardDescription>Arrivées vs Départs par mois</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fill: "gray" }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                        dataKey="arrivees"
                        fill={chartConfig.arrivee.color}
                        name={chartConfig.arrivee.label}
                        />
                        <Bar
                        dataKey="departs"
                        fill={chartConfig.depart.color}
                        name={chartConfig.depart.label}
                        />
                    </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="leading-none text-muted-foreground">
                    Nombre total de courriers : {totalLetters}
                    </div>
                </CardFooter>
                </Card>

                {/* Radial Donut Chart */}
                <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Répartition des courriers</CardTitle>
                    <CardDescription>Arrivées vs Départs</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-w-[250px]"
                    >
                    <RadialBarChart
                        data={[{ arrivees: totalArrivees, departs: totalDeparts }]}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                    >
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                        <Label
                            content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                >
                                    <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) - 16}
                                    className="fill-foreground text-2xl font-bold"
                                    >
                                    {totalLetters.toLocaleString()}
                                    </tspan>
                                    <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 4}
                                    className="fill-muted-foreground"
                                    >
                                    Courriers
                                    </tspan>
                                </text>
                                );
                            }
                            }}
                        />
                        </PolarRadiusAxis>
                        <RadialBar
                        dataKey="arrivees"
                        stackId="a"
                        cornerRadius={5}
                        fill={chartConfig.arrivee.color}
                        className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                        dataKey="departs"
                        stackId="a"
                        cornerRadius={5}
                        fill={chartConfig.depart.color}
                        className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                    En hausse de 5,2 % ce mois-ci <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                    Nombre total de courriers : {totalLetters}
                    </div>
                </CardFooter>
                </Card>
            </div>
            </div>
        </>
        )};
    </>
  );
}