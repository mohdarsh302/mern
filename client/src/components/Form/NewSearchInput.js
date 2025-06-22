import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewSearchInput = () => {
    const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="col-lg-4 col-6 text-left">
    <form  onSubmit={handleSubmit}>
      <div className="input-group">
        <input type="search" className="form-control"   value={values.keyword} placeholder="Search for products" onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
        <div className="input-group-append">
          <button className="input-group-text bg-transparent text-primary" type="submit">
            <i className="fa fa-search" />
          </button>
        </div>
      </div>
    </form>
  </div>
  )
}

export default NewSearchInput
