import { useState } from 'react';
import InputBox from './Components/Input-box';
import useCurrency from './assets/hooks/UseCurrencyInfo';
import './App.css';

function App() {
    const [amount, setAmount] = useState(true);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState(true);

    const { data: CurrencyInfo, loading, error } = useCurrency(from);


    const options = CurrencyInfo ? Object.keys(CurrencyInfo) : [];

    const swap = () => {
        setFrom(to);
        setTo(from);
        setAmount(convertedAmount);
        setConvertedAmount(amount);
    };

    const convert = () => {
        if (CurrencyInfo && CurrencyInfo[to]) {
            setConvertedAmount(amount * CurrencyInfo[to]);
        }
    };

    return (
        <>
            <h1 className='text-7xl text-blue'>Currency Converter</h1>

<div className="converter-content-main">
<div className='bg-img'>
   <div className="main-content">
   <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert();
                    }}
                >
                    <div className="input">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={setFrom}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="swap-btn"
                            onClick={swap}
                        >
                            Swap
                        </button>
                    </div>
                    <div className="input">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency)=>setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="convert-btn">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
    
   </div>
</div>

          

              
        </>
    );
}

export default App;