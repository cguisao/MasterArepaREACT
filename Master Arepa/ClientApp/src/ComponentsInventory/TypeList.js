import React, { useEffect, useState } from "react";
import { Row, Col } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { useAuth0 } from "../react-auth0-wrapper";
import NotAuthenticated from "../components_Admin/NotAuthenticated";
import Preloader from "../components/Preloader";

const TypeList  = () => {

    const [setErrors] = useState(false);
    const [data, setItems] = useState({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const useStyles = makeStyles({
        root: {
          width: '100%',
        },
        container: {
          maxHeight: 440,
        },
      });

      const classes = useStyles();

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("api/Admin/GetInventoryType");
                res
                    .json()
                        .then(res => setItems(res))
                            .catch(err => setErrors(err));
    }

    fetchData();
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    const { loading, isAuthenticated, user } = useAuth0();

    if (loading) {
        return <Preloader />;
    }
    
    if(!isAuthenticated){
        return <NotAuthenticated />;
    }

    var role = user[Object.keys(user)[0]];

    if(isAuthenticated && role == "Admin"){
        return (
            <React.Fragment>
                <div className="row">
                    <Col>
                        <div className="title-heading mb-5">
                            <h2 className="text-dark mb-1 font-weight-light text-uppercase">Inventory Type List</h2>
                        </div>
                    </Col>
                </div>
                <Row>
                <Paper>
                    <TableContainer>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Type</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {Object.values(data).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                                <TableRow key={item.id}>
                                <TableCell component="th" scope="row">
                                    {item.type}
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination rowsPerPageOptions={[5, 10, 50]} 
                        count={Object.values(data).length} 
                        component="div"
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                </Paper>
                </Row>
            </React.Fragment>
        );   
        }
        else{
            return <NotAuthenticated />;
        }
}

export default TypeList;