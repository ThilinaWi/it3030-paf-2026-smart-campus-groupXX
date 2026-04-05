package com.campus.service;

import com.campus.dto.ResourceCreateDTO;
import com.campus.dto.ResourceDTO;
import com.campus.dto.ResourceUpdateDTO;
import java.util.List;

public interface ResourceService {
    ResourceDTO createResource(ResourceCreateDTO dto);
    ResourceDTO updateResource(String id, ResourceUpdateDTO dto);
    void deleteResource(String id);
    ResourceDTO getResourceById(String id);
    List<ResourceDTO> getAllResources();
    List<ResourceDTO> searchResources(String type, Integer minCapacity, String location, String searchTerm);
}