// Variáveis dos inputs
let inputDay = document.getElementById("birth-day");
let inputMonth = document.getElementById("birth-month");
let inputYear = document.getElementById("birth-year");
let button = document.getElementById("submit");

// Variáveis dos textos
let spanYear = document.getElementById("year");
let spanMonth = document.getElementById("month");
let spanDay = document.getElementById("day");

// Variáveis dos spans de erro
let spanErroDia = document.getElementById("erro-dia");
let spanErroMes = document.getElementById("erro-mes");
let spanErroAno = document.getElementById("erro-ano");

// Função para verificar se o ano é bissexto
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Função para obter o número de dias no mês
function getDaysInMonth(month, year) {
  switch (month) {
    case 1: // Janeiro
    case 3: // Março
    case 5: // Maio
    case 7: // Julho
    case 8: // Agosto
    case 10: // Outubro
    case 12: // Dezembro
      return 31;
    case 4: // Abril
    case 6: // Junho
    case 9: // Setembro
    case 11: // Novembro
      return 30;
    case 2: // Fevereiro
      return isLeapYear(year) ? 29 : 28;
    default:
      return 0;
  }
}

// Função para calcular a diferença entre duas datas em anos, meses e dias
function calcularIdade(diaNasc, mesNasc, anoNasc) {
  const hoje = new Date(); // Data atual
  const dataNascimento = new Date(anoNasc, mesNasc - 1, diaNasc); // Ajusta mês porque JavaScript usa base zero para meses

  // Calcula a diferença em anos
  let anos = hoje.getFullYear() - dataNascimento.getFullYear();
  let meses = hoje.getMonth() - dataNascimento.getMonth();
  let dias = hoje.getDate() - dataNascimento.getDate();

  // Ajusta a diferença em anos e meses, se necessário
  if (dias < 0) {
    meses--;
    const ultimoMes = new Date(
      hoje.getFullYear(),
      hoje.getMonth() - 1,
      dataNascimento.getDate()
    );
    dias += new Date(hoje.getFullYear(), hoje.getMonth() - 1, 0).getDate(); // Total de dias no mês passado
  }
  if (meses < 0) {
    anos--;
    meses += 12;
  }

  return { anos, meses, dias };
}
// Esconde todas as mensagens de erro inicialmente
spanErroDia.style.visibility = "hidden";
spanErroMes.style.visibility = "hidden";
spanErroAno.style.visibility = "hidden";

// Função para validar a data e calcular a idade
function validaData() {
  const dia = parseInt(inputDay.value, 10);
  const mes = parseInt(inputMonth.value, 10);
  const ano = parseInt(inputYear.value, 10);

  // Esconde todas as mensagens de erro inicialmente
  spanErroDia.style.visibility = "hidden";
  spanErroMes.style.visibility = "hidden";
  spanErroAno.style.visibility = "hidden";

  // Remove as classes de erro dos inputs e labels
  inputDay.classList.remove("input-erro");
  inputMonth.classList.remove("input-erro");
  inputYear.classList.remove("input-erro");
  document
    .querySelector(`label[for="birth-day"]`)
    .classList.remove("label-erro");
  document
    .querySelector(`label[for="birth-month"]`)
    .classList.remove("label-erro");
  document
    .querySelector(`label[for="birth-year"]`)
    .classList.remove("label-erro");

  let erro = false;

  // Validar ano
  if (isNaN(ano) || ano.toString().length !== 4) {
    spanErroAno.style.visibility = "visible";
    inputYear.classList.add("input-erro");
    document
      .querySelector(`label[for="birth-year"]`)
      .classList.add("label-erro");
    erro = true;
  }

  // Validar mês
  if (isNaN(mes) || mes < 1 || mes > 12) {
    spanErroMes.style.visibility = "visible";
    inputMonth.classList.add("input-erro");
    document
      .querySelector(`label[for="birth-month"]`)
      .classList.add("label-erro");
    erro = true;
  }

  // Validar dia
  const diasNoMes = getDaysInMonth(mes, ano);
  if (isNaN(dia) || dia < 1 || dia > diasNoMes) {
    spanErroDia.style.visibility = "visible";
    inputDay.classList.add("input-erro");
    document
      .querySelector(`label[for="birth-day"]`)
      .classList.add("label-erro");
    erro = true;
  }

  // Validar ano atual
  const anoAtual = new Date().getFullYear();
  if (ano < 1900 || ano > anoAtual) {
    spanErroAno.style.visibility = "visible";
    inputYear.classList.add("input-erro");
    document
      .querySelector(`label[for="birth-year"]`)
      .classList.add("label-erro");
    erro = true;
  }

  if (erro) return;

  // Calcular a idade
  const idade = calcularIdade(dia, mes, ano);

  // Atualizar os spans com a idade calculada
  spanDay.textContent = idade.dias;
  spanMonth.textContent = idade.meses;
  spanYear.textContent = idade.anos;

  // Limpar os inputs
  inputDay.value = "";
  inputMonth.value = "";
  inputYear.value = "";
}

// Adicionar evento de clique no botão
button.addEventListener("click", validaData);
