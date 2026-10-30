import { useState } from 'react';
import { Table, BarChart2 } from 'lucide-react';
import Card from '../ui/Card';

const MONTHLY_FINANCIAL_DATA = [
  { month: 'May 2026', income: 42000, expenses: 28000, label: 'Pre-sowing & tillage' },
  { month: 'Jun 2026', income: 36000, expenses: 45000, label: 'Seed & fertilizer purchases' },
  { month: 'Jul 2026', income: 58000, expenses: 22000, label: 'Vegetable early harvest & subsidy' },
  { month: 'Aug 2026', income: 64000, expenses: 31000, label: 'Tomato & onion wholesale' },
  { month: 'Sep 2026', income: 78000, expenses: 26000, label: 'Soybean harvest sales' },
  { month: 'Oct 2026', income: 92000, expenses: 34000, label: 'Cotton first picking & PM-KISAN' },
];

export default function IncomeExpenseSvgChart() {
  const [showTable, setShowTable] = useState(false);

  // SVG dimensions
  const width = 640;
  const height = 260;
  const paddingX = 50;
  const paddingY = 30;
  const maxVal = 100000;

  const chartHeight = height - paddingY * 2;
  const chartWidth = width - paddingX * 2;
  const groupWidth = chartWidth / MONTHLY_FINANCIAL_DATA.length;
  const barWidth = 18;

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary block">
            Farm Financial Analytics (Demo)
          </span>
          <h3 className="text-lg font-heading font-bold text-gray-900">
            Monthly Income vs Farm Operating Expenses
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Legend */}
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-primary" aria-hidden="true" />
              <span>Income</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-amber" aria-hidden="true" />
              <span>Expenses</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowTable(!showTable)}
            aria-label={showTable ? 'Switch to SVG chart' : 'Switch to text data table'}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline px-2 py-1 rounded min-h-[36px]"
          >
            {showTable ? (
              <>
                <BarChart2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Show Chart</span>
              </>
            ) : (
              <>
                <Table className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Text Table</span>
              </>
            )}
          </button>
        </div>
      </div>

      {showTable ? (
        /* Accessible Text Table Alternative */
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse" aria-label="Monthly income and expense data table">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-700">
                <th scope="col" className="p-2.5 font-semibold">Month</th>
                <th scope="col" className="p-2.5 font-semibold text-right">Income (₹)</th>
                <th scope="col" className="p-2.5 font-semibold text-right">Expenses (₹)</th>
                <th scope="col" className="p-2.5 font-semibold text-right">Net Profit (₹)</th>
                <th scope="col" className="p-2.5 font-semibold">Farm Activities</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MONTHLY_FINANCIAL_DATA.map((row) => (
                <tr key={row.month} className="hover:bg-gray-50">
                  <td className="p-2.5 font-medium text-gray-900">{row.month}</td>
                  <td className="p-2.5 text-right font-mono text-primary font-bold">
                    ₹{row.income.toLocaleString('en-IN')}
                  </td>
                  <td className="p-2.5 text-right font-mono text-amber-700 font-bold">
                    ₹{row.expenses.toLocaleString('en-IN')}
                  </td>
                  <td className="p-2.5 text-right font-mono font-bold text-gray-900">
                    ₹{(row.income - row.expenses).toLocaleString('en-IN')}
                  </td>
                  <td className="p-2.5 text-gray-600">{row.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Hand-Built SVG Bar Chart */
        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto min-w-[540px] max-h-[280px]"
            role="img"
            aria-label="Bar chart showing farm income and expenses from May to October 2026. Peak income was 92,000 Rupees in October."
          >
            {/* Grid Lines */}
            {[0, 25000, 50000, 75000, 100000].map((val) => {
              const y = height - paddingY - (val / maxVal) * chartHeight;
              return (
                <g key={val}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="#E5E7EB"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill="#6B7280"
                    fontFamily="Inter, sans-serif"
                  >
                    ₹{val / 1000}k
                  </text>
                </g>
              );
            })}

            {/* Bars and Month Labels */}
            {MONTHLY_FINANCIAL_DATA.map((d, i) => {
              const groupCenterX = paddingX + i * groupWidth + groupWidth / 2;
              const incomeHeight = (d.income / maxVal) * chartHeight;
              const expenseHeight = (d.expenses / maxVal) * chartHeight;

              const incomeX = groupCenterX - barWidth - 2;
              const expenseX = groupCenterX + 2;

              const incomeY = height - paddingY - incomeHeight;
              const expenseY = height - paddingY - expenseHeight;

              return (
                <g key={d.month} className="transition-all hover:opacity-90">
                  {/* Income bar */}
                  <rect
                    x={incomeX}
                    y={incomeY}
                    width={barWidth}
                    height={incomeHeight}
                    rx="4"
                    fill="#1F6B3A"
                  >
                    <title>{`${d.month} Income: ₹${d.income.toLocaleString('en-IN')}`}</title>
                  </rect>

                  {/* Expense bar */}
                  <rect
                    x={expenseX}
                    y={expenseY}
                    width={barWidth}
                    height={expenseHeight}
                    rx="4"
                    fill="#F4B400"
                  >
                    <title>{`${d.month} Expenses: ₹${d.expenses.toLocaleString('en-IN')}`}</title>
                  </rect>

                  {/* Month Label */}
                  <text
                    x={groupCenterX}
                    y={height - paddingY + 16}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="500"
                    fill="#4B5563"
                    fontFamily="Inter, sans-serif"
                  >
                    {d.month.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      <div className="text-[11px] text-gray-500 flex items-center justify-between pt-1">
        <span>*Based on registered farm acreage and harvests (Simulated demo records).</span>
        <span>Average Net Margin: 58%</span>
      </div>
    </Card>
  );
}
