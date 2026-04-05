package com.campus.service.impl;

import com.campus.dto.ResourceCreateDTO;
import com.campus.dto.ResourceDTO;
import com.campus.dto.ResourceUpdateDTO;
import com.campus.exception.ResourceNotFoundException;
import com.campus.model.Resource;
import com.campus.repository.ResourceRepository;
import com.campus.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ResourceServiceImpl implements ResourceService {
    
    @Autowired
    private ResourceRepository resourceRepository;
    
    @Override
    public ResourceDTO createResource(ResourceCreateDTO dto) {
        Resource resource = new Resource(
            dto.getName(),
            dto.getType(),
            dto.getCapacity(),
            dto.getLocation()
        );
        resource.setDescription(dto.getDescription());
        resource.setImageUrl(dto.getImageUrl());
        resource.setAvailabilityWindow(dto.getAvailabilityWindow());
        
        Resource saved = resourceRepository.save(resource);
        return convertToDTO(saved);
    }
    
    @Override
    public ResourceDTO updateResource(String id, ResourceUpdateDTO dto) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));
        
        if (dto.getName() != null) resource.setName(dto.getName());
        if (dto.getType() != null) resource.setType(dto.getType());
        if (dto.getCapacity() != null) resource.setCapacity(dto.getCapacity());
        if (dto.getLocation() != null) resource.setLocation(dto.getLocation());
        if (dto.getStatus() != null) resource.setStatus(dto.getStatus());
        if (dto.getDescription() != null) resource.setDescription(dto.getDescription());
        if (dto.getImageUrl() != null) resource.setImageUrl(dto.getImageUrl());
        if (dto.getAvailabilityWindow() != null) resource.setAvailabilityWindow(dto.getAvailabilityWindow());
        
        resource.setUpdatedAt(LocalDateTime.now());
        
        Resource updated = resourceRepository.save(resource);
        return convertToDTO(updated);
    }
    
    @Override
    public void deleteResource(String id) {
        if (!resourceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Resource not found with id: " + id);
        }
        resourceRepository.deleteById(id);
    }
    
    @Override
    public ResourceDTO getResourceById(String id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));
        return convertToDTO(resource);
    }
    
    @Override
    public List<ResourceDTO> getAllResources() {
        List<Resource> resources = resourceRepository.findAll();
        List<ResourceDTO> dtos = new ArrayList<>();
        for (Resource resource : resources) {
            dtos.add(convertToDTO(resource));
        }
        return dtos;
    }
    
    @Override
    public List<ResourceDTO> searchResources(String type, Integer minCapacity, String location, String searchTerm) {
        List<Resource> resources = resourceRepository.searchResources(type, minCapacity, location);
        List<ResourceDTO> dtos = new ArrayList<>();
        
        for (Resource resource : resources) {
            if (searchTerm != null && !searchTerm.isEmpty()) {
                if (resource.getName() != null && resource.getName().toLowerCase().contains(searchTerm.toLowerCase())) {
                    dtos.add(convertToDTO(resource));
                }
            } else {
                dtos.add(convertToDTO(resource));
            }
        }
        return dtos;
    }
    
    private ResourceDTO convertToDTO(Resource resource) {
        return new ResourceDTO(
            resource.getId(),
            resource.getName(),
            resource.getType(),
            resource.getCapacity(),
            resource.getLocation(),
            resource.getStatus(),
            resource.getDescription(),
            resource.getImageUrl(),
            resource.getAvailabilityWindow(),
            resource.getCreatedAt(),
            resource.getUpdatedAt()
        );
    }
}