"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { Budget } from "@/server/actions/budget";

const chartConfig = {
  maxSpend: {
    label: "Max Spend",
  },
} satisfies ChartConfig;

function BudgetsChart({ budgets }: { budgets: Budget[] }) {
  const chartData = useMemo(() => {
    return budgets.map((budget) => {
      const [color, code] = budget.theme.split("#");
      return {
        category: budget.category,
        maxSpend: budget.maxSpend,
        fill: `#${code}`,
      };
    });
  }, []);

  const totalMaxSpend = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.maxSpend, 0);
  }, [chartData]);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="maxSpend"
          nameKey="category"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      $0
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      of ${totalMaxSpend.toLocaleString()} limit
                    </tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

export default BudgetsChart;
