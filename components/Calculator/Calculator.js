import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Calculator({ children }) {

    const [tipPercent, setTipPercent] = useState(0)
    const [billAmount, setBillAmount] = useState(0)
    const [numOfPeople, setNumOfPeople] = useState(0)
    const [tipPerPerson, setTipPerPerson] = useState('0.00')
    const [totalPerPerson, setTotalPerPerson] = useState('0.00')
    const [reset, setReset] = useState(false)

    useEffect(() => {
        console.log(`tipPercent: ${tipPercent}, billAmount: ${billAmount}, numOfPeople: ${numOfPeople} tipPerPerson: ${tipPerPerson}`)
        if (tipPercent && billAmount && numOfPeople) {
            const tip = calculateTotalTip(billAmount, tipPercent)
            console.log('Int amount ' + billAmount)
            setTipPerPerson(calculateTipPerPerson(tip, numOfPeople))
            setTotalPerPerson(calculateBillAmountPerPerson(billAmount, numOfPeople, tipPerPerson))
        }

        setReset(false)
    })

    const smallButtonAmounts = [5, 10, 15, 25, 50]
    const smallButtons = smallButtonAmounts.map((amount, i) => 
        <SmallButton number={amount} tipPercent={tipPercent} setTipPercent={setTipPercent} key={i} />
    )

    const convertFloatToInt = num => {
        let stringNum = String(num)
        if (!stringNum.split('.')[1]) {
            stringNum += '00'
        }
        else if (stringNum.split('.')[1].length < 2) {
            stringNum += '0'
        }
        stringNum = stringNum.replace('.', '')
        return Number(stringNum)
    }

    const convertIntToFloat = num => {
        let numArray = String(num).split('')
        numArray.splice(numArray.length - 2, 0, '.')
        if (numArray[0] === '.') {
            numArray.splice(0, 0, '0')
        }
        return numArray.join('')
    }

    const calculateTotalTip = (billAmount, tipPercent) => (convertFloatToInt(billAmount) / 100) * tipPercent

    const calculateTipPerPerson = (tip, numOfPeople) => convertIntToFloat(Math.round(tip / numOfPeople))

    const calculateBillAmountPerPerson = (billAmount, numOfPeople, tipPerPerson) => 
        convertIntToFloat(Math.round((convertFloatToInt(billAmount) / numOfPeople) + convertFloatToInt(tipPerPerson)))

    const resetState = () => {
        const setters = [setTipPercent, setBillAmount, setNumOfPeople, setTipPerPerson, setTotalPerPerson]

        setters.forEach((setter, i) => {
            if (i > 2) {
                setter('0.00')
            }
            else {
                setter(0)
            }
        })

        setReset(true)
    }

    return(
        <div className="calculator flexbox p35">

            <div className="leftSide p15">
                <div className="mb40">
                    <h2 className="darkGreyishCyan1 mb10">Bill</h2>

                    <Input id="bill" image="/images/icon-dollar.svg" onChange={setBillAmount} reset={reset} currentValue={billAmount} />
                </div>
                <div className="mb40">
                    <h2 className="darkGreyishCyan1 mb10">Select Tip %</h2>

                    <div className="flexbox flexWrap setInput">
                        {smallButtons}
                        <CustomTipButton setTipPercent={setTipPercent} reset={reset} />
                    </div>
                </div>
                <div>
                    <h2 className="darkGreyishCyan1 mb10">Number Of People</h2>
                    <h2 className="hidden mb10">Can't Be Zero</h2>
                    <Input id="numOfPeople" image="/images/icon-person.svg" onChange={setNumOfPeople} reset={reset} />
                </div>
            </div>

            <div className="rightSide darkCyanBackground lightGreyishCyanText2 relative">
                <div>
                    <div className="flexbox">
                        <div className="flexbox tipText">
                            <p className="rightStandard mb5">Tip Amount</p>
                            <p className="rightSmall darkGreyishCyan2">/ person</p>
                        </div>
                        <p className="rightSideNumber strongGreenText">£{tipPerPerson}</p>
                    </div>
                    <div>
                        <p className="rightLarge"></p>
                    </div>
                </div>

                <div>
                    <div className="flexbox">
                        <div className="flexbox tipText">
                            <p className="rightStandard mb5">Total Amount</p>
                            <p className="rightSmall darkGreyishCyan2">/ person</p>
                        </div>
                        <p className="rightSideNumber strongGreenText">£{totalPerPerson}</p>
                    </div>
                    <div>
                        <p className="rightLarge"></p>
                    </div>
                </div>

                <button className="strongGreenBackground darkCyanText" id="resetButton" onClick={resetState}>RESET</button>
            </div>

        </div>
    )
}

const Input = props => {
    let image = ''
    let width = 11
    let onChange
    let currentValue = props.currentValue

    // Reset the value if the reset buton has been clicked
    if (props.reset) {
        currentValue = 0
    }

    const handleChange = e => props.onChange(e.target.value)

    if (props.image === '/images/icon-person.svg') {
        width = 14
    }

    if (props.image) {
        image = <Image
                    src={props.image}
                    height={17}
                    width={width}
                />
    }

    if (props.onChange) {
        onChange = handleChange
    }

    return(
        <div>
            <div className="relative">
                <div className="labelImage">
                    {image}
                </div>
                <input 
                    className="lightGreyishCyanBackground2 heavy" 
                    type="number" 
                    id={props.id} 
                    onChange={onChange}
                    value={currentValue}
                />
            </div>
        </div>
    )
}

const CustomTipButton = props => {

    const keyDown = e => {
        // Prevents anything other than a number or backspace being used
        if ((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 106) || e.keyCode === 8) {
            if (e.target.value.length < 2 || e.keyCode === 8) {
                return
            }
        }
        e.preventDefault()
    }

    const handleChange = e => {
        let number = e.target.value
        
        if (!number) {
            number = 0
        }

        props.setTipPercent(number)
    }

    return(
        <div>
            <div className="relative">
                <input 
                    className="lightGreyishCyanBackground2 heavy" 
                    type="number" 
                    id="customTip"
                    onChange={handleChange}
                    onKeyDown={keyDown}
                    placeholder="Custom"
                />
            </div>
        </div>
    )
}

const SmallButton = props => {
    
    const selectButton = () => props.setTipPercent(props.number)

    let colourClasses = 'whiteText darkCyanBackground'

    if (props.tipPercent === props.number) {
        colourClasses = 'darkCyanText strongGreenBackground'
    }

    return(
        <label className={colourClasses + " smallButtonContainer flex1 mb15 relative"}>
            <input type="radio" name={props.number} onClick={selectButton} />
            <div className="heavy" id={props.number}><span>{props.number + '%'}</span></div>
        </label>
    )

}