const express = require('express');
const cors = require('cors');
const connectDB = require('./backend/dao/DB');
const FirstUserUtil = require('./backend/util/FirstUserUtil')
const userRoutes = require('./backend/route/UserRoutes');
const pageRoutes = require('./frontend/route/PageRoutes');
const authRouters = require('./backend/route/AuthRoutes');
const appointmentRouters = require('./backend/route/AppointmentRoutes');
const imageRoutes = require('./backend/route/ImageRoutes');
const contactRouters = require('./backend/route/ContactRoutes');
const packageRouters = require('./backend/route/PackageRoutes');
const testRouters = require('./backend/route/TestRoutes');
const requestCallRoutes = require('./backend/route/RequestCallRoutes');
const configRoutes = require('./backend/route/ConfigRoutes');
const emailRouters = require('./backend/route/EmailRoutes');

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(express.static('frontend'));

connectDB();
FirstUserUtil.createFirstUser();

app.use(cors());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRouters);
app.use('/api/v1/appointments', appointmentRouters);
app.use('/api/v1/image', imageRoutes);
app.use('/api/v1/contact', contactRouters);
app.use('/api/v1/packages', packageRouters)
app.use('/api/v1/tests', testRouters);
app.use('/api/v1/request-call', requestCallRoutes);
app.use('/api/v1/config', configRoutes);
app.use('/api/v1/email', emailRouters)
app.use('', pageRoutes);



app.listen(PORT, () => {
    console.log(`Server started`);
});