// export interface countdownProps {
//     [index: string]: { items?: { name: string; time: string }[] };
//   }

export interface countdownProps {
  [index: string]: {
    items?: { name: string; startTime: string }[];
  };
}

// export interface countdownProps {
//   Monday: dayProps;
//   Tuesday: dayProps;
//   Wednesday: dayProps;
//   Thursday: dayProps;
//   Friday: dayProps;
//   Saturday: dayProps;
//   Sunday: dayProps;
// }

interface dayProps {
  items?: { name: string; time: string }[];
}
