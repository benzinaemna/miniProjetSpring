package org.ms.factureservice.Dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class FactureDto {
    private Date dateFacture;
    private Long clientID;
    private double price;
    private List<FactureLigneDTO> facturelignes;

    public Date getDateFacture() {
        return dateFacture;
    }

    public void setDateFacture(Date dateFacture) {
        this.dateFacture = dateFacture;
    }

    public Long getClientID() {
        return clientID;
    }

    public void setClientID(Long clientID) {
        this.clientID = clientID;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public List<FactureLigneDTO> getFacturelignes() {
        return facturelignes;
    }

    public void setFacturelignes(List<FactureLigneDTO> facturelignes) {
        this.facturelignes = facturelignes;
    }
}
