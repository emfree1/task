const input = document.querySelector('.input')

let userAll = []

const getData = (async () => {
  const resp = await fetch('https://reqres.in/api/users?page=1')
  const respData = await resp.json()
  userAll = await respData.data
  renderUsers(userAll)
})()

const sortById = () => {
  clearTable()

  const peopleId = document.querySelector('.idBtn')
  peopleId.classList.toggle('sort')

  if (peopleId.classList.contains('sort')) {
    const sortIdUp = userAll.sort((a, b) => (a.id > b.id ? 1 : -1))
    renderUsers(sortIdUp)
  } else {
    const sortId = userAll.sort((a, b) => (a.id < b.id ? 1 : -1))
    renderUsers(sortId)
  }
}

const sortByName = () => {
  clearTable()
  const sortName = userAll.sort((a, b) =>
    a.first_name > b.first_name ? 1 : -1
  )
  renderUsers(sortName)
}

document.querySelector('.idBtn').onclick = sortById

document.querySelector('.nameBtn').onclick = sortByName

const clearTable = () => {
  const users = document.querySelector('.people')
  while (users.firstChild) {
    users.removeChild(users.firstChild)
  }
}

const renderUsers = (userAll) => {
  const people = document.querySelector('.people')

  userAll.forEach((elem) => {
    const peopleWrapper = document.createElement('div')
    peopleWrapper.classList.add('peopleWrapper')
    peopleWrapper.innerHTML = `
      <div class= 'id'>${elem.id}</div>
      <div class= 'name'>${elem.first_name} ${' '} ${elem.last_name} </div>
      <div  class= 'email' onclick='checkEmail("${elem.email}")' >${
      elem.email
    }</div>
    `
    people.append(peopleWrapper)
  })
}

const checkEmail = async (email) => {
  const emailDiv = document.querySelector('.email')

  const data = {
    email: email,
    password: Math.floor(Math.random() * 10000),
  }

  const response = await fetch('https://reqres.in/api/register', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
  const dataPost = await response.json()
  alert( `Токен : ${dataPost.token}`)

  localStorage.setItem(email, dataPost.token)
  console.log(localStorage.getItem(email))

  if (localStorage.getItem(email) == dataPost.token) {
      emailDiv.classList.add('green')   // знаю шо тут вертає 1-ший дів ане той на який клікається
    }
  // я не вшарив як добавляти зелене поле через локалсторедж
}

const valueInput = (e) => {
  const peopleWr = document.querySelectorAll('.peopleWrapper')
  const value = e.target.value.toUpperCase()
  peopleWr.forEach((item) => {
    let heading = item.querySelector('.name')
    let headingContent = heading.innerHTML.toUpperCase()
    console.log(headingContent)

    if (headingContent.includes(value)) {
      item.classList.add('show')
      item.classList.remove('hide')
    } else {
      item.classList.add('hide')
      item.classList.remove('show')
    }
  })
}

input.addEventListener('input', valueInput)

// OOP

class manager {
  constructor(name, range, capacity, seats) {
    this.name = name
    this.range = range
    this.capacity = capacity
    this.seats = seats
  }

  static createCargoAircraft(name, range, capacity, seats) {
    return new manager(name, range, capacity, seats)
  }

  static createCompany(companyName, air) {
    return {
      [companyName]: [...air],
    }
  }

  static printCompanies() {
    console.log(manager.createCompany('Company name 1'))
  }
}

let aircraft1 = manager.createCargoAircraft('Mria', 500, 50000, 0)
let aircraft2 = manager.createCargoAircraft('Bombardier', 500, 50000, 0)
let aircraft3 = manager.createCargoAircraft('Airbus', 500, 0, 50)
let aircraft4 = manager.createCargoAircraft('Boeing', 500, 0, 100)

let company1 = manager.createCompany('Company name 1', [aircraft2, aircraft3])
let company2 = manager.createCompany('Company name 2', [aircraft1, aircraft4])
console.log(company1, company2)

// manager.printCompanies();
// manager.printCompany(company1); 

// 3 - RegExp

let string =
  'Коли Львова ще не було, на його сучасній території можна було знайти тільки невеличкі села asd@dd.ua, заховані серед гір, що завжди захищали селян він набігів a@.uk ворогів. Густі ліси навколо завжди допомагали 123 селянам – тут можна було і полювати, і <a href="https://mi.ua">link</a> прогулятись чудовими теплими деньками, і заховатись від періодичних набігів… <a href="https://co.co">asdr</a> Тож ніхто й гадки не мав, що у лісі є чого боятись. Та одного дня селяни помітили, що почали зникати люди. Виявилось, що це справа рук Лева, який підстерігав сміливців, що гуляли у лісі наодинці, ловив їх і затягував у свою печеру. Більше звідти ніхто не повертався.'

const email = string.match(/[-.\w]+@([\w-]+\.)+[\w-]+/g)
const links = string.match(
  /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
)
const number = string.match(/\d+/g)
const replaceStr = string.replace(/ліси/gi, 'озера')

console.log(email)
console.log(links)
console.log(number)
console.log(replaceStr)
