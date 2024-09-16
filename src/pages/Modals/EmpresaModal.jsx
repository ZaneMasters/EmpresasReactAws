import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EmpresaModal = ({ show, onClose, onSave, formValues, onChange, isEditMode }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Editar Empresa' : 'Crear Empresa'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formNit">
                        <Form.Label>NIT</Form.Label>
                        <Form.Control
                            type="text"
                            name="nit"
                            value={formValues.nit}
                            onChange={onChange}
                            disabled={isEditMode} // Deshabilitado en modo edición
                            placeholder="Ingrese el NIT"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNombreEmpresa">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombreEmpresa"
                            value={formValues.nombreEmpresa}
                            onChange={onChange}
                            placeholder="Ingrese el nombre de la empresa"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDireccion">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            type="text"
                            name="direccion"
                            value={formValues.direccion}
                            onChange={onChange}
                            placeholder="Ingrese la dirección"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTelefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            name="telefono"
                            value={formValues.telefono}
                            onChange={onChange}
                            placeholder="Ingrese el teléfono"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={onSave}>
                    {isEditMode ? 'Actualizar Empresa' : 'Crear Empresa'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EmpresaModal;
