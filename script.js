

const addNewMatchBtn = document.getElementById('addMatch')
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


incrementInputField.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        const incrementValue = parseInt(incrementInputField.value)
        store.dispatch({
            type: "increment",
            payload: incrementValue
        })
        incrementInputField.value = ""
        console.log(incrementValue)
    }
})

decrementInputField.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        const decrementValue = parseInt(decrementInputField.value)
        store.dispatch({
            type: "decrement",
            payload: decrementValue
        })
        decrementInputField.value = ""
    }
})


addNewMatchBtn.addEventListener('click', () => {
    matchCount++

    const newMatch = document.createElement('div')
    newMatch.classList.add('match')
    newMatch.innerHTML = `<div class="wrapper">
    <button class="lws-delete">
        <img src="./image/delete.svg" alt="" />
    </button>
    <h3 class="lws-matchName">Match ${matchCount}</h3>
</div>
<div class="inc-dec">
    <div class="incrementForm">
        <h4>Increment</h4>
        <input type="number" name="increment" class="lws-increment" />
    </div>
    <div class="decrementForm">
        <h4>Decrement</h4>
        <input type="number" name="decrement" class="lws-decrement" />
    </div>
</div>
<div class="numbers">
    <h2 class="lws-singleResult">0</h2>
</div>`

    matchContainer.appendChild(newMatch)
    console.log(5)
})
