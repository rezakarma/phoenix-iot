import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

type Props = {
    title: string;
    setTime: (value: string) => void;
    time : string;
}

const TimeInput = (props: Props) => {
    return ( 
        <div className="flex flex-col gap-3">
          <label>{props.title}</label>
          <TimePicker
            className="rounded-2xl"
            onChange={(date) => props.setTime(date)}
            value={props.time}
          />
        </div>
     );
}
 
export default TimeInput;