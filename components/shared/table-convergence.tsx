import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface Props {
  resultEuler: number[];
  resultPredictorCorrector: number[];
  resultRungeKuttaThird: number[];
  resultRungeKuttaFourth: number[];
  taus: number[];
  title: string;
  type?: number;
}

export const TableConvergence: React.FC<Props> = ({
  resultEuler,
  resultPredictorCorrector,
  resultRungeKuttaThird,
  resultRungeKuttaFourth,
  taus,
  title,
  type,
}) => {
  return (
    <div>
      {taus
        .map((tau, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl mb-4">
              {title}
              &tau; = {tau}
            </h2>
            <Table className="w-[300px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Метод Эйлера</TableHead>
                  <TableHead>Предиктор-корректор</TableHead>
                  <TableHead>Метод Рунге-Кутта III порядка</TableHead>
                  <TableHead>Метод Рунге-Кутта IV порядка</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="text-center">
                  <TableCell>{resultEuler[index]}</TableCell>
                  <TableCell>{resultPredictorCorrector[index]}</TableCell>
                  <TableCell>{resultRungeKuttaThird[index]}</TableCell>
                  <TableCell>{resultRungeKuttaFourth[index]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ))
        .slice(0, type === 1 ? taus.length - 1 : taus.length)}
    </div>
  );
};
