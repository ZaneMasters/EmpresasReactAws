import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProductoModal = ({ show, onClose, onSave, formValues, onChange, empresas, isEditMode }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Editar Producto' : 'Crear Producto'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="nombreProducto">
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombreProducto"
                            value={formValues.nombreProducto}
                            onChange={onChange}
                            placeholder="Ingrese el nombre del producto"
                        />
                    </Form.Group>
                    <Form.Group controlId="codigo">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            type="text"
                            name="codigo"
                            value={formValues.codigo}
                            onChange={onChange}
                            placeholder="Ingrese el código"
                        />
                    </Form.Group>
                    <Form.Group controlId="caracteristicas">
                        <Form.Label>Características</Form.Label>
                        <Form.Control
                            type="text"
                            name="caracteristicas"
                            value={formValues.caracteristicas}
                            onChange={onChange}
                            placeholder="Ingrese las características"
                        />
                    </Form.Group>
                    <Form.Group controlId="precio">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            name="precio"
                            value={formValues.precio}
                            onChange={onChange}
                            placeholder="Ingrese el precio"
                        />
                    </Form.Group>
                    <Form.Group controlId="empresa">
                    <Form.Label>Empresa</Form.Label>
                    <Form.Control
                        as="select"
                        name="empresa"
                        value={formValues.empresa.nit || ''} // Usar el nit de la empresa
                        onChange={onChange}
                    >
                        <option value="">Seleccionar empresa</option>
                        {empresas.map((empresa) => (
                            <option key={empresa.nit} value={empresa.nit}>
                                {empresa.nombreEmpresa}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={onSave}>
                    {isEditMode ? 'Actualizar' : 'Guardar'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductoModal;
