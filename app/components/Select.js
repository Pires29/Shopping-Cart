import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { setOrder, setRating } from "../redux/features/productsSlice";

export default function CustomSelect() {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    if(value === 'rating'){
      dispatch(setRating(value));
      console.log("event.target.value", value);
    } else {
      dispatch(setOrder(value));
      console.log("event.target.value", value);
    }
  };
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Ordenar" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">Preço mais alto</SelectItem>
        <SelectItem value="desc">Preço mais baixo</SelectItem>
        <SelectItem value="rating">Melhor avaliados</SelectItem>
      </SelectContent>
    </Select>
  );
}
