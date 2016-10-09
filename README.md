# jakarta trafic router

## problem
- Jakarta is heavy trafic jam city
- Agust 30, 2016. Trafic validation started.
- The logic is way too simple.
  - `Check date odd/even`
  - `Check your car number odd/even`
  - `If odd-odd or even-even, you can go main street. If not, you will be late.`
- When you are wake up in `fucking non-matching day` , it's the same result even if you go `9:00` or `9:30`.
- But it's tiresome to check the date everyday.

## solution
- lambda mailer
