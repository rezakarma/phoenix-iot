// import GaugeChart from 'react-gauge-chart';

// const CustomGaugeChart = ({ value, min, max, name }) => {
//   const calculatedValue = ((value - min) / (max - min)) * 100;

//   return (
//     <div className="flex flex-col items-center">
//       <GaugeChart
//         id="gauge-chart"
//         nrOfLevels={10}
//         arcsLength={[calculatedValue, 100 - calculatedValue]}
//         colors={['black', 'white']}
//         arcPadding={0.02}
//         style={{ width: '200px', height: '200px' }}
//         arcStrokeLinecap="butt"
//         textColor="black"
//         arcLabel={() => ''}
//         arcLabelStyles={{ fill: 'black' }}
//       />
//       <div className="text-center">
//         <p className="text-xl font-medium">{name}</p>
//         <p className="text-lg font-medium">{value}</p>
//       </div>
//     </div>
//   );
// };

// export default CustomGaugeChart;


import GaugeChart from 'react-gauge-chart';

const CustomGaugeChart = ({value, min, max, name }) => {
  const calculatedValue = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col items-center w-[250px]">
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={10}
        arcsLength={[calculatedValue, 100 - calculatedValue]}
        percent={calculatedValue / 100}
        colors={['black', '#f6f6f6']}
        arcPadding={0.02}
        arcStrokeLinecap="butt"
        textColor="black"
        arcLabel={() => ''}
        arcLabelStyles={{ fill: 'black' }}
        needleScale={0.55}
        // hideText={true}
        cornerRadius={50}
        formatTextValue={(val) => Math.round(val) + '%' }

      />
      <div className="flex justify-between w-[70%]">
        <div className="text-center">
          <p className="text-lg">{min}</p>
        </div>
        <div className="text-center">
        <p className="text-xl font-medium">{name}</p>
        <p className="text-lg font-medium">{value}</p>
      </div>
        <div className="text-center">
          <p className="text-lg">{max}</p>
        </div>
      </div>
     
    </div>
  );
};

export default CustomGaugeChart;