/* eslint-disable @typescript-eslint/no-explicit-any */
export function groupByMonth(data: any[]) {
  const grouped = data?.reduce((acc, current) => {
    const month = current?.month;

    if (!acc[month]) {
      acc[month] = [];
    }

    acc[month].push(current);

    return acc;
  }, {});

  // Convert the object to an array of objects with month names as keys
  return Object?.keys(grouped)?.map((month) => ({
    [month]: grouped[month],
  }));
}
