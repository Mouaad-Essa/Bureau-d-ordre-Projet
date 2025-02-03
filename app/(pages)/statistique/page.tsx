"use client";

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

interface StatisticsData {
  lettresArrivees: number;
  lettresDeparts: number;
  monthlyStats: { month: string; arrivees: number; departs: number }[];
}

export default function StatistiquePage() {
  const [chartData, setChartData] = useState<
    { month: string; arrivees: number; departs: number }[]
  >([]);
  const [totalLetters, setTotalLetters] = useState(0);
  const [error, setError] = useState<string | null>(null);

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
    <div className="container flex gap-4 flex-col">
      {" "}
      <h1
        className=" rounded-lg w-fit self-center bg-gradient-to-r from-gray-200 
   from-40% to-blue-500 text-gray-900 text-2xl 
   font-semibold p-3 flex items-center justify-center"
      >
        <span>Statistiques</span>
        <ChartNoAxesCombined />
      </h1>
      <div className="flex flex-row gap-6">
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
  );
}
