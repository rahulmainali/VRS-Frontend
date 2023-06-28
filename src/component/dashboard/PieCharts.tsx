import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Bar
} from 'recharts'

const data = [
  { name: 'Facebook', users: 20, fill: '#8884d8' },
  { name: 'Instagram', users: 10, fill: '#F44236' },
  { name: 'Twiter', users: 15, fill: '#2196F3' },

  { name: 'Telegram', users: 5, fill: '#FFCA29' }
]

const PieCharts = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <>
      <PieChart width={400} height={400}>
        <title>Vehicle Categories</title>
        <Legend align='left' verticalAlign="top" />

        <Pie
          dataKey="users"
          isAnimationActive={true}
          data={data}
          cx={200}
          cy={200}
          outerRadius={100}
          paddingAngle={5}
          legendType="circle"
          labelLine={false}
          label={renderCustomizedLabel}
        />
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </PieChart>
    </>
  )
}

export default PieCharts
