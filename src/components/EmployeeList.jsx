import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProgressBar, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const employeesPerPage = 10;

  const url = "http://89.116.25.43:3500/api/empleados/listar";

  const getApi = async () => {
    const response = await axios.get(url);
    setEmpleados(response.data.result);
    console.log(response);
  };

  useEffect(() => {
    getApi();
  }, []);

  const getColor = (estado) => {
    return estado ? "green" : "red";
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * employeesPerPage;
  const pageCount = Math.ceil(empleados.length / employeesPerPage);
  const currentEmployees = empleados.slice(offset, offset + employeesPerPage);

  return (
    <div className="employee-list-container">
      <h1>Tabla de Empleados</h1>
      <Table striped bordered hover className="employee-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Identificacion</th>
            <th>Nombres</th>
            <th>Fecha de nacimiento</th>
            <th>Tiempo Contrato</th>
            <th>Valor Contrato</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{offset + index + 1}</td>
                <td>{item.identificacion}</td>
                <td>{item.nombres}</td>
                <td>{item.fecha_nacimiento}</td>
                <td>
                  <ProgressBar
                    now={item.tiempo_contrato}
                    label={`${item.tiempo_contrato}%`}
                    className="progress-bar"
                  />
                </td>
                <td>{item.valor_contrato}</td>
                <td style={{ color: getColor(item.estado) }}>
                  {item.estado ? "Activo" : "Inactivo"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination-container"}
        activeClassName={"active"}
        pageLinkClassName={"pagination-link"}
        previousLinkClassName={"pagination-link"}
        nextLinkClassName={"pagination-link"}
        disabledClassName={"pagination-link-disabled"}
      />
    </div>
  );
};

export default EmployeeList;
