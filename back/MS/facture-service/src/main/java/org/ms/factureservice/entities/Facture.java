package org.ms.factureservice.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.ms.factureservice.model.Client;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Facture {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private Date dateFacture;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "facture")
    private List<FactureLigne> facturelignes;
    @Transient
    private Client client;
    private Long clientID;
    private double price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDateFacture() {
        return dateFacture;
    }

    public void setDateFacture(Date dateFacture) {
        this.dateFacture = dateFacture;
    }

    public List<FactureLigne> getFacturelignes() {
        return facturelignes;
    }

    public void setFacturelignes(List<FactureLigne> facturelignes) {
        this.facturelignes = facturelignes;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
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

    @Override
    public String toString() {
        return "Facture{" +
                "id=" + id +
                ", dateFacture=" + dateFacture +
                ", client=" + client +
                ", clientID=" + clientID +
                ", price=" + price +
                '}';
    }
}