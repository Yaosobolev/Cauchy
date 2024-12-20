"use client";

import {
  f1,
  f2,
  fTotal1,
  fTotal2,
  t01,
  t02,
  T1,
  T2,
  tau,
  u01,
  u02,
} from "@/lib/constants";
import {
  checkConvergence,
  checkError,
  euler,
  precise,
  predictorCorrector,
  rungeKuttaFourth,
  rungeKuttaThird,
} from "@/lib/formulas";
import { TableCalcValues } from "./table-calc-values";
import { TableConvergence } from "./table-convergence";
import { useState } from "react";
import { Button } from "../ui";

interface Props {
  className?: string;
  id: string;
}

export const Result: React.FC<Props> = ({ className, id }) => {
  const [isOpenSolution, setIsOpenSolution] = useState<boolean>(false);

  const onClickToggleSolution = () => {
    setIsOpenSolution(!isOpenSolution);
  };

  const values = {
    f: id === "1" ? f1 : f2,
    t0: id === "1" ? t01 : t02,
    T: id === "1" ? T1 : T2,
    u0: id === "1" ? u01 : u02,
    fTotal: id === "1" ? fTotal1 : fTotal2,
  };

  //   Значения
  const resultEuler = tau.map((tau) =>
    euler(values.T, values.t0, tau, values.u0, values.f)
  );
  const resultPredictorCorrector = tau.map((tau) =>
    predictorCorrector(values.T, values.t0, tau, values.u0, values.f)
  );
  const resultRungeKuttaThird = tau.map((tau) =>
    rungeKuttaThird(values.T, values.t0, tau, values.u0, values.f)
  );
  const resultRungeKuttaFourth = tau.map((tau) =>
    rungeKuttaFourth(values.T, values.t0, tau, values.u0, values.f)
  );

  const resultPrecise = tau.map((tau) =>
    precise(values.T, values.t0, tau, values.u0, values.fTotal)
  );

  //   Сходимость
  const convergenceEuler = checkConvergence(resultEuler, tau);
  const convergencePredictorCorrector = checkConvergence(
    resultPredictorCorrector,
    tau
  );
  const convergenceRungeKuttaThird = checkConvergence(
    resultRungeKuttaThird,
    tau
  );
  const convergenceRungeKuttaFourth = checkConvergence(
    resultRungeKuttaFourth,
    tau
  );

  //   Погрешность
  const errorEuler = checkError(resultEuler, tau, resultPrecise);
  const errorPredictorCorrector = checkError(
    resultPredictorCorrector,
    tau,
    resultPrecise
  );
  const errorRungeKuttaThird = checkError(
    resultRungeKuttaThird,
    tau,
    resultPrecise
  );
  const errorRungeKuttaFourth = checkError(
    resultRungeKuttaFourth,
    tau,
    resultPrecise
  );

  return (
    <div className={className}>
      <Button className="text-base mt-4" onClick={onClickToggleSolution}>
        {isOpenSolution ? "Отменить" : "Вычислить"}
      </Button>

      {isOpenSolution && (
        <div className="flex flex-col gap-12">
          <TableCalcValues
            resultEuler={resultEuler}
            resultPredictorCorrector={resultPredictorCorrector}
            resultRungeKuttaThird={resultRungeKuttaThird}
            resultRungeKuttaFourth={resultRungeKuttaFourth}
            resultPrecise={resultPrecise}
            taus={tau}
          />
          <TableConvergence
            type={1}
            resultEuler={convergenceEuler}
            resultPredictorCorrector={convergencePredictorCorrector}
            resultRungeKuttaThird={convergenceRungeKuttaThird}
            resultRungeKuttaFourth={convergenceRungeKuttaFourth}
            taus={tau}
            title="Проверка сходимости полученного решения для указанных методов при(Макс разностей) "
          />
          <TableConvergence
            resultEuler={errorEuler}
            resultPredictorCorrector={errorPredictorCorrector}
            resultRungeKuttaThird={errorRungeKuttaThird}
            resultRungeKuttaFourth={errorRungeKuttaFourth}
            taus={tau}
            title="Сопоставление методов(Макс погрешность) при "
          />
        </div>
      )}
    </div>
  );
};
