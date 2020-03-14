import React from "react";

type Props = {
  roundID: number;
};

export default function Round({ roundID }: Props) {
  return <div>{roundID}</div>;
}
