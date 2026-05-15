export const Card = ({ className = "", children }) => {
  return (
    <div className={`bg-base-300 rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
};
