import { cn } from "@/lib/utils";
import {
  f1,
  f2,
  fTotal1,
  fTotal2,
  t01,
  t02,
  T1,
  T2,
  u01,
  u02,
} from "@/lib/constants";
import Image from "next/image";

interface Props {
  id: string;
  className?: string;
}

export const Header: React.FC<Props> = ({ className, id }) => {
  const values = {
    f: id === "1" ? f1 : f2,
    t0: id === "1" ? t01 : t02,
    T: id === "1" ? T1 : T2,
    u0: id === "1" ? u01 : u02,
    fTotal: id === "1" ? fTotal1 : fTotal2,
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h1 className="text-xl font-bold">
        Численное решение задачи Коши для обыкновенных дифференциальных
        уравнений
      </h1>
      <div className="flex items-center">
        <p>f(t, u) = </p>{" "}
        <Image src="/f1.png" alt="f(t, u)" width={100} height={100} />
      </div>
      <div className="flex items-center">
        <p>
          t <sub>0</sub> = {values.t0}
        </p>{" "}
      </div>
      <div className="flex items-center">
        <p>T = {values.T}</p>{" "}
      </div>
      <div className="flex items-center">
        <p>
          u <sub>0</sub> = {values.u0}
        </p>{" "}
      </div>
      <div className="flex items-center">
        <p>точное решение = </p>{" "}
        <Image src="/f2.png" alt="точное решение" width={100} height={100} />
      </div>
    </div>
  );
};
