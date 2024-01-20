package org.ms.produitservice.web;

import org.ms.produitservice.entities.Categorie;
import org.ms.produitservice.entities.Produit;
import org.ms.produitservice.repository.CategorieRepository;
import org.ms.produitservice.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(value = "/categories")
public class CategorieRestController {
    @Autowired
    private CategorieRepository categorieRepository;
    @GetMapping(path="/")
    public List<Categorie> list()
    {
        List<Categorie> a = categorieRepository.findAll();
        return a;
    }
    @GetMapping(path="/{id}")
    public Categorie getOne( @PathVariable Long id)
    {
        return categorieRepository.findById(id).get();
    }
    @PostMapping(path="/")
    public Categorie save(@RequestBody Categorie categorie)
    {
        return categorieRepository.save(categorie);
    }
    @PutMapping (path="/{id}")
    public Categorie update(@PathVariable Long id,@RequestBody Categorie categorie)
    {
        categorie.setId(id);
        return categorieRepository.save(categorie);
    }
    @DeleteMapping (path="/{id}")
    public void delete( @PathVariable Long id)
    {
        categorieRepository.deleteById( id);
    }
}
