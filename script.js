

const addNewMatchBtn = document.getElementById('addMatch')
const resetMatchBtn = document.getElementById('resetMatch')
const matchContainer = document.getElementById('matchContainer')

const incrementInputField = document.getElementById('increment')
const decrementInputField = document.getElementById('decrement')
const totalScore = document.getElementById('result')

let matchCount = 1

const initialState = {
    value: 0
}

function scoreReducer(state = initialState, action) {
    if (action.type === 'increment') {
        return {
            ...state,
            value: state.value + action.payload
        }
    }
    else if (action.type === 'decrement') {
        if (state.value - action.payload < 0) {
            return {
                ...state,
                value: state.value - state.value
            }
        }

        else {
            return {
                ...state,
                value: state.value - action.payload
            }
        }

    }
    else if (action.type === 'reset') {
        return {
            ...state,
            value: action.payload
        }
    }
    else {
        state
    }
}

const store = Redux.createStore(scoreReducer)

const render = () => {
    const state = store.getState()
    totalScore.innerText = state.value.toString()
}

store.subscribe(render)


incrementInputField.addEventListener('submit', function (event) {
    event.preventDefault()

    const increaseInput = document.getElementById('incrementInput')
    const increaseValue = parseInt(increaseInput.value)
    increaseInput.value = ""

    store.dispatch({
        type: "increment",
        payload: increaseValue
    })
})

decrementInputField.addEventListener('submit', function (event) {
    event.preventDefault()

    const decreaseInput = document.getElementById('decrementInput')
    const decreaseValue = parseInt(decreaseInput.value)
    decreaseInput.value = ""

    store.dispatch({
        type: "decrement",
        payload: decreaseValue
    })


})


addNewMatchBtn.addEventListener('click', () => {
    matchCount++

    const newMatch = document.createElement('div')
    newMatch.classList.add('match')
    newMatch.innerHTML = `   <div class="wrapper">
    <button class="lws-delete">
        <img src="./image/delete.svg" alt="" />
    </button>
    <h3 class="lws-matchName">Match ${matchCount}</h3>
</div>
<div class="inc-dec">
    <form class="incrementForm" id="increment">
        <h4>Increment</h4>
        <input type="number" name="increment" class="lws-increment" id="incrementInput" />
    </form>
    <form class="decrementForm" id="decrement">
        <h4>Decrement</h4>
        <input type="number" name="decrement" class="lws-decrement" id="decrementInput" />
    </form>
</div>
<div class="numbers">
    <h2 class="lws-singleResult" id="result">0</h2>
</div>`

    matchContainer.appendChild(newMatch)


})

resetMatchBtn.addEventListener('click', () => {
    store.dispatch({
        type: "reset",
        payload: 0
    })
})




// allMatches.addEventListener('submit', function (event) {
//     event.preventDefault()
// })



// for (const mat of allMatches) {
//     mat.addEventListener('submit', function (event) {
//         event.preventDefault()
//     })

//     console.log(mat)
// }