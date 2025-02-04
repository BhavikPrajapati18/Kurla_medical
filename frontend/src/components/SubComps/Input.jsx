import React, { useId } from "react";

function Input({ label, type = "text", ...rest }, ref) {
  const Id = useId();
  return (
    <div>
      {label && <label className="">{label}</label>}
      <input type={type} ref={ref} {...rest} id={Id} />
    </div>
  );
}

export default React.forwardRef(Input);
