import { useRef, useEffect } from "react";

function Contract({ value }) {
  const spanEle = useRef(null);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [value]);

  let donationList = []
  for (let i=0; i<value.length; i++) {
    let donation = value[i];
    let item = <p id={`donation_id_${donation.id}`}> {`ID${donation.id} ${donation.donator} ${donation.amount}ETH @${donation.timestamp}`} </p>;
    donationList.push(item)
  }
  

  return (
    <code>
      <span className="secondary-color" ref={spanEle}>
        <strong>{donationList.length <= 0 ? "???" : donationList}</strong>
      </span>
    </code>
  );
}

export default Contract;
