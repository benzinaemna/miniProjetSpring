package org.ms.produitservice.web;

import org.ms.produitservice.entities.Produit;
import org.ms.produitservice.repository.CategorieRepository;
import org.ms.produitservice.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/produits")
public class ProduitRestController {
    @Autowired
    private ProduitRepository produitRepository;
    @Autowired
    private CategorieRepository categorieRepository;
    @RequestMapping(
            value = "/")
    public List<Produit> list()
    {
        List<Produit> a = produitRepository.findAll();
        return a;
    }
    @GetMapping(value="/{id}" )
    public Produit getOne( @PathVariable Long id)
    {
        return produitRepository.findById(id).get();
    }
    @PostMapping(value = "/")
    public Produit save(@RequestBody Produit produit) {
        return produitRepository.save(produit);
    }
    @PutMapping (value="/{id}")
    public Produit update(@PathVariable Long id,@RequestBody Produit produit)
    {
        produit.setId(id);
        return produitRepository.save(produit);
    }
    @DeleteMapping (value="/{id}")
    public void delete( @PathVariable Long id)
    {
        produitRepository.deleteById( id);
    }
}
