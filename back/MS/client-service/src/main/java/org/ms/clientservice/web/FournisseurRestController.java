package org.ms.clientservice.web;

import org.ms.clientservice.entities.Client;
import org.ms.clientservice.entities.Fournisseur;
import org.ms.clientservice.repository.ClientRepository;
import org.ms.clientservice.repository.FournisseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping(value = "/fournisseurs")
public class FournisseurRestController {

    @Autowired
    private FournisseurRepository fournisseurRepository;
    @GetMapping(path="/")
    public List<Fournisseur> list()
    {
        return fournisseurRepository.findAll();
    }
    @GetMapping(path="/{id}")
    public Fournisseur getOne( @PathVariable Long id)
    {
        return fournisseurRepository.findById(id).get();
    }
    @PostMapping(path="/")
    public Fournisseur save(@RequestBody Fournisseur fournisseur)
    {
        return fournisseurRepository.save(fournisseur);
    }
    @PutMapping (path="/{id}")
    public Fournisseur update(@PathVariable Long id,@RequestBody Fournisseur fournisseur)
    {
        fournisseur.setId(id);
        return fournisseurRepository.save(fournisseur);
    }
    @DeleteMapping (path="/{id}")
    public void delete( @PathVariable Long id)
    {
        fournisseurRepository.deleteById( id);
    }
}
