package org.ms.factureservice.Dto;

import lombok.Data;

@Data
public class FactureLigneDTO {
    private Long produitID;
    private Integer quantity;
    private Double price;

    public Long getProduitID() {
        return produitID;
    }

    public void setProduitID(Long produitID) {
        this.produitID = produitID;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
