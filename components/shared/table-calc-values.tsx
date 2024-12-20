import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface Props {
  resultEuler: number[][];
  resultPredictorCorrector: number[][];
  resultRungeKuttaThird: number[][];
  resultRungeKuttaFourth: number[][];
  resultPrecise: number[][];
  taus: number[];
}

export const TableCalcValues: React.FC<Props> = ({
  resultEuler,
  resultPredictorCorrector,
  resultRungeKuttaThird,
  resultRungeKuttaFourth,
  resultPrecise,
  taus,
}) => {
  return (
    <div>
      {taus.map((tau, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl mb-4">
            Табличные значения функции при &tau; = {tau}
          </h2>
          <Table className="w-[300px]">
            <TableHeader>
              <TableRow>
                <TableHead>i</TableHead>
                <TableHead>Метод Эйлера</TableHead>
                <TableHead>Предиктор-корректор</TableHead>
                <TableHead>Метод Рунге-Кутта III порядка</TableHead>
                <TableHead>Метод Рунге-Кутта IV порядка</TableHead>
                <TableHead>Точное решение</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultEuler[index].map((item, i) => (
                <TableRow className="text-center" key={i}>
                  <TableCell>{i}</TableCell>
                  <TableCell>{item}</TableCell>
                  <TableCell>{resultPredictorCorrector[index][i]}</TableCell>
                  <TableCell>{resultRungeKuttaThird[index][i]}</TableCell>
                  <TableCell>{resultRungeKuttaFourth[index][i]}</TableCell>
                  <TableCell>{resultPrecise[index][i]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};
