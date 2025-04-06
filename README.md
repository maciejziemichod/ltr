## 1. Jakiego typu danych użyjesz do przechowywania poszczególnych wartości w bazie danych?

OrderItem:

- net_price - DECIMAL
- quantity - INTEGER
- net_total - DECIMAL
- total - DECIMAL

Order:

- net_total - DECIMAL
- tax - DECIMAL
- total - DECIMAL

Alternatywnie wartości monetarne można by przechowywać w najmniejszej jednostce waluty, np grosze, gdyby była potrzebna idealna precyzja lub wykonywalibyśmy dużo obliczeń wymagających wysokiej precyzji.

## 2. Napisz kod(+testy), który wypełni brakujące wartości dla obu encji mając dany Order z OrderItemami (podane net_price i quantity) oraz wysokość podatku w %. Podatek dla pojedynczego OrderItema powinien być liczony od wartości net_total.

Kod uzupełniający brakujące wartości dla Order i OrderItem znajduje się w pliku src/services/orderCalculator.ts

Aby odpalić testy należy użyć następujących komend:

```
npm i
npm run test

# albo

npx vitest
```
