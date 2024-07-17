import React, { useState } from "react";

interface Choice {
  _id: string;
  name: string;
}

interface DropdownProps {
  choices: Choice[];
  onSelect: (_id: string) => void;
  dropdownName: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  choices,
  onSelect,
  dropdownName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  const handleToggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectChoice = (choice: Choice) => {
    setSelectedChoice(choice);
    onSelect(choice._id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        onClick={handleToggleDropdown}
        className="text-white backdrop-blur-lg bg-white/10 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {selectedChoice ? selectedChoice.name : `Select ${dropdownName}`}
        <svg
          className="w-2.5 h-2.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 rounded-lg dark:bg-black/90 absolute w-auto "
        >
          <ul
            className="py-2 text-sm  text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {choices.map((choice) => (
              <li key={choice._id}>
                <button
                  type="button"
                  className="block w-full text-left px-4 py-2  hover:bg-gray-100 dark:hover:bg-black/20 dark:hover:text-white"
                  onClick={() => handleSelectChoice(choice)}
                >
                  {choice.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
