import dayjs from 'dayjs';

const getMaxCredit = (billGenDate, billPaymentDate) => {
  const currentDate = dayjs();

  let days = -1;

  const daysForBillGeneration = billGenDate.diff(currentDate, 'days');

  const daysToPay = billPaymentDate.diff(billGenDate, 'days');
  days = daysForBillGeneration + daysToPay;

  return days;
};

export const getMaxCreditDays = (genDate, payDate) => {
  const billGenDate = isNaN(genDate) ? Number(genDate) : genDate;
  const billPayDate = isNaN(payDate) ? Number(payDate) : payDate;

  if (billGenDate === billPayDate)
    throw new Error('Bill Generation and Paymente Date cannot be same! ');

  const billGenDateForCurrentMonth = dayjs().date(billGenDate);
  const billPaymentDateForCurrentMonth = dayjs().date(billPayDate);

  const currentDate = dayjs();

  let nextBillPayDate = dayjs();

  let totalDays = -1;

  // If date current month bill gen date is in past.
  if (billGenDateForCurrentMonth.isAfter(currentDate)) {
    if (billPaymentDateForCurrentMonth.isAfter(currentDate)) {
      totalDays = getMaxCredit(
        billGenDateForCurrentMonth,
        billPaymentDateForCurrentMonth,
      );
    } else {
      const nextMonthBillPay = dayjs().add(1, 'month').date(billPayDate);
      nextBillPayDate = nextMonthBillPay;
      totalDays = getMaxCredit(billGenDateForCurrentMonth, nextMonthBillPay);
    }
  } else {
    // Calcuate the same date for next month
    const nextMonthBillGen = dayjs().add(1, 'month').date(billGenDate);
    const nextMonthBillPay = dayjs().add(1, 'month').date(billPayDate);
    nextBillPayDate = nextMonthBillPay;
    totalDays = getMaxCredit(nextMonthBillGen, nextMonthBillPay);
  }

  return {totalDays, nextBillPayDate};
};
