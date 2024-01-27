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

  // bill gen date is in past
  if (billGenDateForCurrentMonth.isBefore(currentDate)) {
    const nextMonthBillGen = dayjs().add(1, 'month').date(billGenDate);
    const nextBillPaymentDate = billPaymentDateForCurrentMonth.add(
      // adding 0 or 1 based on the month of the pay date
      nextMonthBillGen.get('month') + (payDate > genDate ? 0 : 1),
      'month',
    );
    return {
      days: getMaxCredit(nextMonthBillGen, nextBillPaymentDate),
      payDate: nextBillPaymentDate,
    };
  } else {
    let billpaymentDate = billPaymentDateForCurrentMonth;

    if (billPaymentDateForCurrentMonth.isBefore(currentDate)) {
      billpaymentDate = billPaymentDateForCurrentMonth.add(1, 'month');
    }

    return {
      days: getMaxCredit(billGenDateForCurrentMonth, billpaymentDate),
      payDate: billPaymentDateForCurrentMonth,
    };
  }
};
