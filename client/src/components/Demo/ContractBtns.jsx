import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue }) {
  const { state: { contract, accounts } } = useEth();
  const [uintInput, setUintInput] = useState("");
  const [stringInput, setStringInput] = useState("");

  const handleUintInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setUintInput(e.target.value);
    }
  };

  const handleStringInputChange = e => {
    setStringInput(e.target.value)
  }

  const read = async () => {
    const value = await contract.methods.getDonations().call({ from: accounts[0] });
    setValue(value);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (stringInput === "") {
      alert("Please enter an author.");
      return;
    }
    if (uintInput === "") {
      alert("Please enter an amount.");
      return;
    }
    const newAmmount = parseInt(uintInput);
    const newAuthor = stringInput
    await contract.methods.createDonation(newAuthor, newAmmount).send({ value: "0x"+(newAmmount*10**18).toString(16), from: accounts[0] });
  };

  return (
    <div className="btns">

      <button onClick={read}>
        REFRESH DONATIONS
      </button>

      <div onClick={write} className="input-btn v-flex">
        SEND DONATION
        <div>
          author(<input
            type="text"
            placeholder="string"
            value={stringInput}
            onChange={handleStringInputChange}
          />)
        </div>
        <div>
          amount(<input
            type="text"
            placeholder="uint"
            value={uintInput}
            onChange={handleUintInputChange}
          />)
        </div>
      </div>

    </div>
  );
}

export default ContractBtns;
