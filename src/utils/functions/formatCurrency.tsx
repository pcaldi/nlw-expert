
// Função para formatar o texto para a moeda para Real
export function FormatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}


