import { useId } from "react";

function InputBox({
    label,
    amount,
    onAmountChange,
    currencyOptions = [],
    onCurrencyChange,
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
}) {
    const amountInput = useId();
    return (
        <div>
            <div>
                <label htmlFor={amountInput}>
                    {label}
                </label>
            </div>
            <input
                type="number"
                placeholder="Amount"
                id={amountInput}
                disabled={amountDisable}
                value={amount}
                onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
            />
            <select
                value={selectCurrency}
                onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                disabled={currencyDisable}
            >
                {currencyOptions.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default InputBox;