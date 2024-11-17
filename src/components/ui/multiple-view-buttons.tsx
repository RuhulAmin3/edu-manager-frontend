import { EDU_MANAGER_TOKENS } from "~/styles/token";
import SecondaryButton from "./secondary-button";
import { FaList, FaRegAddressCard } from "react-icons/fa6";
import { FC } from "react";

type MultipleViewButtonsProps = {
    cardView:boolean, 
    setCardView:(x:boolean)=> void;
};

const MultipleViewButtons:FC<MultipleViewButtonsProps>= ({cardView, setCardView}) => {
  return (
    <>
      <SecondaryButton
        onClick={()=> setCardView(!cardView)}
        bgHoverColor={EDU_MANAGER_TOKENS.colors["edu-primary"]}
        hoverColor={EDU_MANAGER_TOKENS.colors["edu-white"]}
        bgColor={!cardView ?  EDU_MANAGER_TOKENS.colors["edu-primary"] : ""}
        textColor={!cardView ? EDU_MANAGER_TOKENS.colors["edu-white"]: ""}
        size="small"
        title="Table view"
      >
        <FaList />
      </SecondaryButton>

      <SecondaryButton
        onClick={()=> setCardView(!cardView)}
        bgHoverColor={EDU_MANAGER_TOKENS.colors["edu-primary"]}
        hoverColor={EDU_MANAGER_TOKENS.colors["edu-white"]}
        bgColor={cardView ?  EDU_MANAGER_TOKENS.colors["edu-primary"] : ""}
        textColor={cardView ? EDU_MANAGER_TOKENS.colors["edu-white"]: ""}
        size="small"
        title="Card View"
      >
        <FaRegAddressCard />
      </SecondaryButton>
    </>
  );
};

export default MultipleViewButtons;
