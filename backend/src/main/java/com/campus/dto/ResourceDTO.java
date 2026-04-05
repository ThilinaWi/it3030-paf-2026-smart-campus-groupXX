package com.campus.dto;

import java.time.LocalDateTime;

public class ResourceDTO {
    private String id;
    private String name;
    private String type;
    private Integer capacity;
    private String location;
    private String status;
    private String description;
    private String imageUrl;
    private String availabilityWindow;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public ResourceDTO() {}
    
    public ResourceDTO(String id, String name, String type, Integer capacity, String location, 
                       String status, String description, String imageUrl, String availabilityWindow,
                       LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.capacity = capacity;
        this.location = location;
        this.status = status;
        this.description = description;
        this.imageUrl = imageUrl;
        this.availabilityWindow = availabilityWindow;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    public String getId() { return id; }
    public String getName() { return name; }
    public String getType() { return type; }
    public Integer getCapacity() { return capacity; }
    public String getLocation() { return location; }
    public String getStatus() { return status; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
    public String getAvailabilityWindow() { return availabilityWindow; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    
    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setType(String type) { this.type = type; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    public void setLocation(String location) { this.location = location; }
    public void setStatus(String status) { this.status = status; }
    public void setDescription(String description) { this.description = description; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setAvailabilityWindow(String availabilityWindow) { this.availabilityWindow = availabilityWindow; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}