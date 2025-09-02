# Travel Website CMS System

A comprehensive Content Management System (CMS) built for your travel website, providing admin capabilities to manage photos, destinations, users, and flight margins.

## 🚀 Features

### Admin Authentication
- Secure login system with role-based access control
- Session management with localStorage persistence
- Protected routes with permission-based access

### Photo Management
- **Upload System**: Drag & drop photo upload with category organization
- **Gallery Management**: View, edit, and delete photos with metadata
- **Categorization**: Organize photos by destination, hotel, activity, or general categories
- **Tagging System**: Add searchable tags to photos for better organization
- **Filtering**: Filter photos by category and destination

### Destination Management
- **CRUD Operations**: Create, read, update, and delete destinations
- **Rich Content**: Manage destination details including descriptions, pricing, ratings
- **Activity Management**: Add and manage activities for each destination
- **Regional Organization**: Organize destinations by geographical regions
- **SEO Support**: SEO title and description fields for better search visibility

### User Management
- **Role-Based Access**: Admin, Editor, and User roles with different permissions
- **User Lifecycle**: Create, update, activate/deactivate user accounts
- **Permission System**: Granular permissions for different CMS features
- **User Analytics**: Track user creation dates and last login times

### Flight Margin Management
- **Dynamic Pricing**: Configure profit margins by region or specific destinations
- **Flexible Margins**: Set percentage-based margins, fixed amounts, or seasonal multipliers
- **Price Preview**: Real-time price calculations showing margin effects
- **Regional Rules**: Different margin rules for different geographical regions

### Dashboard & Analytics
- **Overview Dashboard**: Key metrics and statistics at a glance
- **Recent Activity**: Track recent changes and uploads
- **Popular Destinations**: View most visited destinations
- **Quick Actions**: Fast access to common CMS tasks

## 🔐 Access & Authentication

### Demo Credentials
- **Username**: `admin`
- **Password**: `admin123`

### Access URL
- **Admin Panel**: Navigate to `/admin` or click "Admin" link in the website footer
- **Login Page**: `/admin/login`

## 🏗️ Technical Architecture

### Frontend Stack
- **React 19** with TypeScript
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **React Hook Form** for form management
- **React Dropzone** for file uploads

### State Management
- **React Context** for admin authentication
- **Local Storage** for session persistence
- **React Query** for API state management

### File Structure
```
src/
├── contexts/
│   └── AdminContext.tsx          # Admin authentication context
├── components/admin/
│   ├── AdminLayout.tsx           # Admin panel layout
│   ├── AdminLogin.tsx            # Login component
│   └── ProtectedRoute.tsx        # Route protection
├── pages/admin/
│   ├── AdminDashboard.tsx        # Main dashboard
│   ├── PhotoManagement.tsx       # Photo management interface
│   ├── DestinationManagement.tsx # Destination CRUD
│   ├── UserManagement.tsx        # User management
│   └── FlightMarginManagement.tsx # Flight margin configuration
├── services/
│   └── adminService.ts           # Admin API services
└── types/
    └── index.ts                  # TypeScript interfaces
```

## 📊 Dashboard Features

### Statistics Cards
- Total destinations count
- Photo library size
- User statistics (total and active)
- System overview metrics

### Recent Activity Feed
- Recent photo uploads
- Destination updates
- User registrations
- System changes

### Popular Destinations
- View rankings by visitor count
- Track destination performance
- Quick access to high-traffic locations

## 🖼️ Photo Management Features

### Upload System
- **Drag & Drop**: Intuitive file upload interface
- **Batch Upload**: Upload multiple photos simultaneously
- **Category Assignment**: Assign photos to categories during upload
- **Tagging**: Add descriptive tags for searchability
- **Destination Linking**: Link photos to specific destinations

### Organization
- **Category Filtering**: Filter by destination, hotel, activity, general
- **Search & Filter**: Find photos quickly using filters
- **Metadata Management**: Edit photo details and tags
- **Bulk Operations**: Perform actions on multiple photos

## 🏖️ Destination Management Features

### Content Management
- **Rich Descriptions**: Detailed destination descriptions
- **Pricing Management**: Set and update destination pricing
- **Rating System**: Manage destination ratings
- **Activity Lists**: Add and organize destination activities

### Organization
- **Regional Grouping**: Organize by geographical regions
- **Search & Filter**: Find destinations by name, region, or price
- **Publication Status**: Draft and published destination states
- **SEO Optimization**: Meta titles and descriptions

## 👥 User Management Features

### User Administration
- **Role Assignment**: Admin, Editor, User roles
- **Permission Control**: Granular permission system
- **Account Status**: Active/inactive user management
- **User Creation**: Add new users with role assignment

### User Analytics
- **Creation Tracking**: Monitor when users were created
- **Login Tracking**: Track last login times
- **Activity Monitoring**: User engagement metrics
- **Role Distribution**: Overview of user roles

## ✈️ Flight Margin Management Features

### Pricing Configuration
- **Percentage Margins**: Set profit margins as percentages
- **Fixed Margins**: Add fixed amounts to base prices
- **Seasonal Multipliers**: Adjust prices for peak seasons
- **Regional Rules**: Different margins for different regions

### Price Calculation
- **Real-time Preview**: See price effects immediately
- **Example Calculations**: Preview with different base prices
- **Margin Analytics**: Track average and highest margins
- **Rule Management**: Create, edit, and delete margin rules

## 🔒 Security Features

### Authentication
- **Session Management**: Secure session handling
- **Role-based Access**: Different permissions for different roles
- **Route Protection**: Protected admin routes
- **Auto-logout**: Session timeout for security

### Permissions System
- `manage_destinations`: Create, edit, delete destinations
- `manage_photos`: Upload, edit, delete photos
- `manage_users`: Create, edit, delete users
- `manage_flight_margins`: Configure pricing margins
- `view_analytics`: Access dashboard analytics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation
1. **Dependencies are already installed** - The CMS system has been integrated into your existing travel website

2. **Access the Admin Panel**:
   - Navigate to your website
   - Scroll to the footer and click "Admin" link
   - Or directly visit `/admin`

3. **Login**:
   - Use demo credentials: `admin` / `admin123`
   - You'll be redirected to the admin dashboard

### Development
- **Frontend Development**: The CMS is integrated with your React application
- **Styling**: Uses Material-UI theme consistent with your website
- **API Integration**: Currently uses mock services - replace with real API calls

## 🎨 Customization

### Theming
- Uses your existing Material-UI theme
- Consistent with main website design
- Responsive design for all screen sizes

### Branding
- Integrated with your travel website branding
- Uses your existing logo and color scheme
- Maintains consistent user experience

## 📱 Responsive Design

### Mobile Support
- Fully responsive admin interface
- Touch-friendly interactions
- Mobile-optimized layouts
- Drawer navigation for mobile devices

### Tablet Support
- Optimized for tablet screens
- Touch interactions
- Appropriate spacing and sizing

## 🔄 Future Enhancements

### Planned Features
- **Real API Integration**: Replace mock services with actual backend
- **Advanced Analytics**: More detailed reporting and metrics
- **Bulk Operations**: Enhanced bulk editing capabilities
- **Advanced Search**: Full-text search across all content
- **Content Scheduling**: Schedule content publication
- **Audit Logging**: Track all admin actions
- **Advanced Permissions**: More granular permission system
- **Multi-language Support**: Internationalization capabilities

### Technical Improvements
- **Database Integration**: Connect to real database
- **File Storage**: Cloud storage for uploaded images
- **Caching**: Implement caching for better performance
- **API Documentation**: Swagger/OpenAPI documentation
- **Testing**: Comprehensive test coverage
- **CI/CD Pipeline**: Automated deployment pipeline

## 🛠️ Maintenance

### Regular Tasks
- **User Management**: Review and manage user accounts
- **Content Review**: Regularly review and update destinations
- **Photo Organization**: Keep photo library organized
- **Margin Updates**: Adjust flight margins based on market conditions

### Monitoring
- **Dashboard Metrics**: Monitor key performance indicators
- **User Activity**: Track admin user activity
- **System Health**: Monitor system performance
- **Content Quality**: Ensure content accuracy and relevance

## 📞 Support

For technical support or questions about the CMS system:
- Check the dashboard for system status
- Review user activity logs
- Contact development team for technical issues

---

**Note**: This CMS system is currently using mock data services. For production use, integrate with your actual backend API and database system.
