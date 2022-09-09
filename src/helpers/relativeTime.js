const relativeTime = (prevDate) => {
  const diff = Number(new Date()) - prevDate;
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;
  switch (true) {
    case diff < minute:
      const seconds = Math.round(diff / 1000);
      return `${seconds} ${seconds > 1 ? "detik" : "detik"} yang lalu`;
    case diff < hour:
      return Math.round(diff / minute) + " menit yang lalu";
    case diff < day:
      return Math.round(diff / hour) + " jam yang lalu";
    case diff < month:
      return Math.round(diff / day) + " hari yang lalu";
    case diff < year:
      return Math.round(diff / month) + " bulan yang lalu";
    case diff > year:
      return Math.round(diff / year) + " tahun yang lalu";
    default:
      return "";
  }
};

export default relativeTime;
