import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { useDispatch } from "react-redux";
  import { setCategory } from "../redux/features/productsSlice";
  
  export default function CategorySelect() {
    const dispatch = useDispatch();
  
    const handleChange = (value) => {
      dispatch(setCategory(value));
      console.log("event.target.value", value);
    };
    return (
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Categorias" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="men's clothing">Men Clothes</SelectItem>
          <SelectItem value="jewelery">Jewelery</SelectItem>
          <SelectItem value="eletronics">Eletronics</SelectItem>
          <SelectItem value="women's clothing">Women Clothes</SelectItem>
        </SelectContent>
      </Select>
    );
  }
  